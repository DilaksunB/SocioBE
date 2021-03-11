import './pre-start'; // Must be the first import
import app from '@server';
import logger from '@shared/Logger';

import { EphemeralDataStore, WebSocketGameLobbyServer, ServerEvents } from 'websocket-game-lobby'
const http = require('http-single-serve');

// Start the server

const datastore = new EphemeralDataStore();


const gameLobby = new WebSocketGameLobbyServer({
    server: http({
        port: 5000
    }),
    port: 8000,
    datastore
});


gameLobby.addEventListener(
    ServerEvents.create,
    async ({ gameId, playerId }, datastore) => {
        await datastore.editGame(gameId, async game => {
            game.custom.color = 'purple';
            return game;
        });
    }
);