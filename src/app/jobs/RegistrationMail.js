 import Mail from "../lib/Mail";

 export default {
   key: "RegistrationMail",
   async handle({ data }) {
    const { user } = data;

    await Mail.sendMail({
      from: 'Queue Test <queue@test.com>',
      to: `${user.name} <${user.email}>`,
      subject: 'Cadastro de Usuário',
      html: `<h2>Seja bem vindo, ${user.name}</h2>`,
    });
   }
 }