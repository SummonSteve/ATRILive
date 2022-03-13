use miniz_oxide::inflate;
use regex::Regex;
use tracing::{error, info};

#[derive(Debug, Clone, PartialEq)]
pub struct BiliPacket{
    packet_len: i32,
    header_len: i32,
    version: i32,
    pub op: i32,
    seq: i32,
    pub body: Vec<Option<String>>,
}



pub fn read_int(buffer: &Vec<u8>, start: i32, len: i32) -> i32 {
    let mut i = len - 1;
    let mut result = 0;
    while i >= 0 {
        result += 256i32.pow((len - i - 1) as u32) * buffer[(start + i) as usize] as i32;
        i -= 1;
    }
    result
}

pub fn write_int(mut buffer: Vec<u8>, start: i32, len: i32, value: i32) -> Vec<u8> {
    let mut i = 0;
    while i < len {
        buffer[(start + i) as usize] = (value / 256i32.pow((len - i - 1) as u32) as i32) as u8;
        i += 1;
    }
    buffer
}

pub fn encode(raw_str: &str, op: i32) -> Vec<u8> {
    let data = raw_str.as_bytes();
    let packet_len = data.len() as i32 + 16;
    let header= [0, 0, 0, 0, 0, 16, 0, 1, 0, 0, 0, op as u8, 0, 0, 0, 1];
    let mut packet = write_int(header.to_vec(), 0, 4, packet_len);
    packet.extend(data);
    packet
}

pub fn decode(buffer: Vec<u8>) -> BiliPacket {
    let mut result = BiliPacket {
        packet_len: read_int(&buffer, 0, 4),
        header_len: read_int(&buffer, 4, 2),
        version: read_int(&buffer, 6, 2),
        op: read_int(&buffer, 8, 4),
        seq: read_int(&buffer, 12, 4),
        body: Vec::new(),
    };
    match result.op {
        5 => {
            let mut offset: i32 = 0;
            while offset < buffer.len() as i32 {
                let packet_len = read_int(&buffer, offset, 4);
                let header_len = 16;
                let _start = offset + header_len;
                let _end = offset + packet_len;
                let data = &buffer[_start as usize.._end as usize];
                let decoded = inflate::decompress_to_vec_zlib(&data);
                match decoded {
                    Ok(decoded) => {
                        let decoded_str = String::from_utf8_lossy(&decoded);
                        let seperator = Regex::new(r"[\x00-\x1f]+").expect("Invalid regex");
                        for item in reg_split(&seperator, &decoded_str) {
                            if item.contains("{"){
                                result.body.push(Some(item.to_string()));
                            }
                        }
                    }
                    Err(_) => {
                        error!("decode error");
                    }
                }
                offset += packet_len;
            }
        },
        3 => {
            let count = read_int(&buffer, 16, 4);
            let fragment = "{\"count\": ".to_string() + &count.to_string() + "}";
            result.body.push(Some(fragment));

        },

        _ => {
            //
        },
    }
    result
}

fn reg_split<'a>(r: &Regex, text: &'a str) -> Vec<&'a str> {
    let mut result = Vec::new();
    let mut last = 0;
    for (index, matched) in text.match_indices(r) {
        if last != index {
            result.push(&text[last..index]);
        }
        result.push(matched);
        last = index + matched.len();
    }
    if last < text.len() {
        result.push(&text[last..]);
    }
    result
}