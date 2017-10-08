import path from 'path';
const config = {
    port: process.env.PORT || 3000,
    controllerConf: path.join(__dirname, '../controllers/'),
    assetsConf: path.join(__dirname, '../assets'),
    viewsConf: path.join(__dirname, '../views')
};

export default config;