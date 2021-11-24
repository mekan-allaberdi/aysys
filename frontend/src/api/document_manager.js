import api from "./api";

const URL = "/docs/";

const get_folder_or_files = async (params, type) => {
  return api
    .get(URL + type + "s/", { params: params })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const new_folder = async (parent_folder, folder_name, path) => {
  const params = {
    name: folder_name,
    parent_folder: parent_folder,
    path: path,
  };

  console.log("PARAMS", params);
  return api
    .post(URL + "folders/", params)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

export { get_folder_or_files, new_folder };
