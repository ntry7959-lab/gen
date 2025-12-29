const fs = require('fs');
const axios = require('axios');
const path = require('path');
const FormData = require("form-data");
const fetch = require("node-fetch");
const cheerio = require("cheerio");
const util = require("util");
const moment = require('moment-timezone');
const pino = require('pino');
const chalk = require('chalk');
const crypto = require('crypto');
const AdmZip = require("adm-zip");
const os = require("os");
const archiver = require('archiver');

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function CatBox(filePath) {
  const form = new FormData();
  form.append("reqtype", "fileupload");
  form.append("fileToUpload", fs.createReadStream(filePath));

  const response = await axios.post("https://catbox.moe/user/api.php", form, {
    headers: form.getHeaders(),
  });

  return response.data;
}

async function formatUptime(seconds) {
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  return `${days}d ${hours}h ${minutes}m ${secs}s`;
}
const getUptime = () => {
    const uptimeSeconds = process.uptime();
    const hours = Math.floor(uptimeSeconds / 3600);
    const minutes = Math.floor((uptimeSeconds % 3600) / 60);
    const seconds = Math.floor(uptimeSeconds % 60);

    return `${hours}h ${minutes}m ${seconds}s`;
};
async function getUcapanWaktu() {
  const time = moment.tz("Asia/Jakarta").format("HH:mm:ss");
  let ucapanWaktu;

  if (time >= "19:00:00" && time < "23:59:59") {
    ucapanWaktu = "🌃 𝑺𝒆𝒍𝒂𝒎𝒂𝒕 𝑴𝒂𝒍𝒂𝒎";
  } else if (time >= "15:00:00" && time < "19:00:00") {
    ucapanWaktu = "🌄 𝑺𝒆𝒍𝒂𝒎𝒂𝒕 𝑺𝒐𝒓𝒆 𝑱𝒊𝒓𝒕";
  } else if (time >= "11:00:00" && time < "15:00:00") {
    ucapanWaktu = "🏞️ 𝑾𝒂𝒌𝒕𝒖 𝑺𝒊𝒂𝒏𝒈";
  } else if (time >= "06:00:00" && time < "11:00:00") {
    ucapanWaktu = "🏙️ 𝑺𝒆𝒍𝒂𝒎𝒂𝒕 𝑷𝒂𝒈𝒊";
  } else {
    ucapanWaktu = "🌆 𝑺𝒆𝒍𝒂𝒎𝒂𝒕 𝑺𝒖𝒃𝒖𝒉 𝑮𝒂𝒏𝒈𝒕𝒆𝒏𝒈";
  }

  return ucapanWaktu;
}

module.exports= { sleep, CatBox, formatUptime, getUptime, getUcapanWaktu };