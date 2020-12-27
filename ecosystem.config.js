const env = {
	PORT: process.env.IFO_PORT,
	IFO_PORT: process.env.IFO_PORT,
	IFO_API_PORT: process.env.IFO_API_PORT,
	IFO_AUTH_TIME: process.env.IFO_AUTH_TIME,
	IFO_JWT_KEY: process.env.IFO_JWT_KEY,
	IFO_MEDIA_URL: process.env.IFO_MEDIA_URL,
	IFO_MONGO_ATLAS_PW: process.env.IFO_MONGO_ATLAS_PW,
	IFO_REST_URL: process.env.IFO_REST_URL,
	IFO_REACT_APP_URL: process.env.IFO_REACT_APP_URL,

}

module.exports = {
	apps: [
{
		name: 'ifound-rest',
		script: 'yarn',
		args: 'start',
		interpreter: '/bin/bash',
		watch: '.',
		env_development: {
			...env,
		},
		env_production: {
			...env,
			SSL_CRT_FILE: '/etc/letsencrypt/live/api.ifound.one/cert.pem',
			SSL_KEY_FILE: '/etc/letsencrypt/live/api.ifound.one/privkey.pem',
		},
	}
]
}