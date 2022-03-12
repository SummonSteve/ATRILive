import ReconnectingWebSocket from 'reconnecting-websocket';

export enum Signal {
    chat_msg,
    chat_gift,
    chat_visitor,
  }

function connect(url: string){
    const rws = new ReconnectingWebSocket(url);

    rws.addEventListener('open', () => {
        rws.send('pong');
    });

    rws.addEventListener('message', (e) => {
        const data = JSON.parse(e.data);
        switch(data.type){
            case Signal.chat_msg:
                console.log('chat_msg');
                break;
            case Signal.chat_gift:
                console.log('chat_gift');
                break;
            case Signal.chat_visitor:
                console.log('chat_visitor');
                break;
        }
    });
}