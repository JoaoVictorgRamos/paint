import { config } from "dotenv";
import Vue from "vue";

export const validateMessage = (request, position) => {
  if (request instanceof Error) {
    if (request.response) {
      // Verifique se a resposta contém dados
      if (request.response.data) {
        // Analise a string JSON contida na propriedade 'error' para acessar os detalhes do erro
        const errorData = JSON.parse(request.response.data.error);

        let message = "";
        for (let i = 0; i < errorData.length; i++) {
          const element = errorData[i];
          message += `• ${element.message} <br>`;
        }

        if (request.respons.config.url.includes("login")) {
          position = "top left";
        }

        Vue.notify({
          group: "global",
          type: "error",
          title: "Paint",
          text: message,
          position: position,
          duration: 5000,
          width: 500,
        });
      } else {
        console.error("Resposta da API está vazia.");
      }
    } else {
      console.error("Erro de requisição HTTP:", request.message);
    }
  } else {
    if (request?.data?.name === "ZodError") {
      let message = "";
      for (let i = 0; i < request.data.issues.length; i++) {
        const element = request.data.issues[i];
        message += `• ${element.message} <br>`;
      }
      Vue.notify({
        group: "global",
        type: "error",
        title: "Paint",
        text: message,
        position: position,
        duration: 5000,
        width: 500,
      });
    }
  }
};
