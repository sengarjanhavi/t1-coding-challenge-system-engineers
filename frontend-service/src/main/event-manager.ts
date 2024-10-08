import { ServerEventsClient } from "./client";
import { Response } from "express";
import { ServerResponseDTO } from "./server-response-dto";
import { OpenPositionDTO } from "./open-position-dto";

const clients: ServerEventsClient[] = [];

export const addClient = (response: Response): ServerEventsClient => {
    const client = new ServerEventsClient(response);
    clients.push(client);
    return client;
};

export const removeClient = (client: ServerEventsClient) => {
    const index = clients.findIndex(c => c.id === client.id);
    if (index !== -1 && clients[index]) {
        clients[index].close();
        clients.splice(index, 1);
    }
};

export const notifyClients = (data: ServerResponseDTO<OpenPositionDTO>) => {
    clients.forEach(client => {
        client.sendEvent(data);
    });
};
