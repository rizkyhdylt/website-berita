const production = 'production'
const development = 'development'

const mode = development
let base_url = ''

if (mode === production){
    base_url = ''
}else{
    base_url = 'http://localhost:5000'
}

// Email Configuration (jika butuh dikonfigurasi juga di sini)
const emailConfig = {
  SERVICE: 'gmail',
  EMAIL_PORT: 465,
  HOST: 'smtp.gmail.com',
  SECURE: true
};

export {
  base_url,
  emailConfig,
  mode
};

// export { base_url }