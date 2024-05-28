import Vue from "vue";
// TYPES -----
  // success, error, info, warn

export const validateMessage = (request, position) => {
  if (request instanceof Error) {

    if (request?.response) {

      if (request?.response?.data) {
       
        const errorData = JSON.parse(request.response.data.error);

        let message = "";
        for (let i = 0; i < errorData.length; i++) {
          const element = errorData[i];
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
      } else {
        // console.error("Resposta da API está vazia.");
        Vue.notify({
          group: "global",
          type: "error",
          title: "Paint",
          text: "Resposta da API está vazia.",
          position: position,
          duration: 5000,
          width: 500,
        });
      }
    } 
    else if (error?.request) {
      // console.error("Sem resposta do servidor:", error.request);
      Vue.notify({
        group: "global",
        type: "error",
        title: "Paint",
        text: "Sem resposta do servidor",
        position: position,
        duration: 5000,
        width: 500,
      });
    } else {
      // console.error("Erro ao configurar a solicitação:", error.message);
      Vue.notify({
        group: "global",
        type: "error",
        title: "Paint",
        text: "Erro de requisição HTTP",
        position: position,
        duration: 5000,
        width: 500,
      });
    }
    // else {
    //   console.error("Erro de requisição HTTP:", request.message);
    // }
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
