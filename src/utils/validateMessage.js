import Vue from "vue";
// TYPES -----
// success, error, info, warn

export const validateMessage = (request, position) => {
  if (request instanceof Error) {
    if (request?.response) {
      if (request?.response?.data) {
        let errorData = request.response.data.error;

        let message = "";

        if (
          typeof errorData === "string" &&
          errorData.startsWith("[") &&
          errorData.endsWith("]")
        ) {
          try {
            errorData = JSON.parse(errorData);
          } catch (e) {
            console.error("Falha ao transformar em JSON:", e);
          }
        }

        if (Array.isArray(errorData)) {
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
          Vue.notify({
            group: "global",
            type: "error",
            title: "Paint",
            text: errorData,
            position: position,
            duration: 5000,
            width: 500,
          });
        }
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
    } else if (request?.error) {
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
    }
  } else {
    console.log(request);
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
    if (request?.data?.sqlMessage) {
      Vue.notify({
        group: "global",
        type: "error",
        title: "Paint",
        text: request.data.sqlMessage,
        position: position,
        duration: 5000,
        width: 500,
      });
    }
  }
};
