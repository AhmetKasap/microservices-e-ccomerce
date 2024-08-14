import { Injectable, HttpStatus } from '@nestjs/common';
import { Response as ExpressResponse } from 'express';

@Injectable()
export class APIResponse {
    private message: string
    private data: any
   

    constructor(message = null, data = null) {
        this.message = message
        this.data = data
    }

    ok(res: ExpressResponse) {
        return res.status(200).json({
            success : true,
            message: this.message,
            data: this.data
        })
    }

    created(res: ExpressResponse) {
        return res.status(201).json({
            success : true,
            message: this.message,
            data: this.data
        })
    }

    badRequest(res: ExpressResponse) {
        return res.status(400).json({
            success : false,
            message: this.message,
            data: this.data
        })
    }

    unauthorized(res: ExpressResponse) {
        return res.status(401).json({
            success : false,
            message: this.message,
            data: this.data
        })
    }

    forbidden(res: ExpressResponse) {
        return res.status(403).json({
            success : false,
            message: this.message,
            data: this.data
        })
    }
    
    notfound(res: ExpressResponse) {
        return res.status(404).json({
            success : false,
            message: this.message,
            data: this.data
        })
    }

    tooManyRequest(res: ExpressResponse) {
        return res.status(429).json({
            success : false,
            message: this.message,
            data: this.data
        })
    }

    conflict(res: ExpressResponse) {
        return res.status(409).json({
            success : false,
            message: this.message,
            data: this.data
        })
    }

    internalServerError(res: ExpressResponse) {
        return res.status(500).json({
            success : false,
            message: this.message,
            data: this.data
        })
    }

    
    notImplemented(res: ExpressResponse) {
        return res.status(501).json({
            success : false,
            message: this.message,
            data: this.data
        })
    }

    serviceUnavailable(res: ExpressResponse) {
        return res.status(503).json({
            success : false,
            message: this.message,
            data: this.data
        })
    }

}