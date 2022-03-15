

import ReconnectingWebSocket from 'reconnecting-websocket';

export enum Signal {
    CHAT_MSG,
    CHAT_GIFT,
    CHAT_VISTOR,
  }

function connect(url: string){
    const rws = new ReconnectingWebSocket(url);

    rws.addEventListener('open', () => {
        rws.send('pong');
    });

    rws.addEventListener('message', (e) => {
        const data = JSON.parse(e.data);
        switch(data.type){
            case Signal.CHAT_MSG:
                console.log('chat_msg');
                break;
            case Signal.CHAT_GIFT:
                console.log('chat_gift');
                break;
            case Signal.CHAT_VISTOR:
                console.log('chat_visitor');
                break;
        }
    });
}