export const environment = {
  firebase: {
    projectId: 'wallsforu-storage',
    appId: '1:265643251050:web:9a1274be9fe8f00d628113',
    storageBucket: 'wallsforu-storage.appspot.com',
    locationId: 'us-central',
    apiKey: 'AIzaSyC8mfs64ZtqdvB03MgYWw5r9FVorE4zTfI',
    authDomain: 'wallsforu-storage.firebaseapp.com',
    messagingSenderId: '265643251050',
  },

  urlBAse: "http://localhost:32774",
  pathUrl: {
    wallpapers: {
      urlListarWallpapers: "/api/wallpaper/listar",
      urlBuscarWallpapers: "/api/wallpaper/buscar?busqueda=",
      urlAgregarWallpapers: "/api/wallpaper/grabar",
      urlBorrarWallpapers: "/api/wallpaper/eliminar?Id=",
      urlModificarWallpapers: "/api/wallpaper/editar",
      urlWallpaperUsuario: "/api/wallpaper/buscarxusuario?usuario=",
      urlBuscarCategorias: "/api/wallpaper/buscarxcategoria?categoria=",
      urlUnoPorCategoria: "/api/wallpaper/unoxcategoria?categoria=",
      urlRandomBanners: "/api/wallpaper/treswallpapers"
    },

    categorias: {
      urlListarCategorias: "/api/categoria/listar",
      urlBuscarCategoria: "/api/categoria/buscarUna?titulo=",
      urlModificarCategoria: "/api/categoria/editar",
      urlAgregarCategoria: "/api/categoria/grabar",
      urlEliminarCategoria: "/api/categoria/eliminar?Id=",
    },

    usuarios: {
      urlListarUsuarios: "/api/usuario/listar",
      urlBuscarUsuario: "/api/usuario/buscarUno?usuario=",
      urlBuscarUsuarioEmail: "/api/usuario/buscarEmail?email=",
      urlValidarUsuario: "/api/usuario/obtenerUsuario?email=",
      urlBuscarUsuarios: "/api/usuario/buscar?usuario=",
      urlModificarUsuario: "/api/usuario/editar",
      urlAgregarUsuario: "/api/usuario/grabar",
      urlEliminarUsuario: "/api/usuario/eliminar?Id=",
    },





    

  }
};
