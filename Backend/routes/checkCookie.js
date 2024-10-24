    import express from 'express';
    import {checkCookies} from '../middleware/checkcookies.js';

    const chkcookies = express.Router();

    chkcookies.get("/checkcookies",checkCookies);

    export default chkcookies;