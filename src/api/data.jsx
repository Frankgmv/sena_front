
import axios from "./instance";

// ! Permisos

export const getPermisosRequest = () => axios.get(`/data/permisos`);

export const getPermisoRequest = (id) => axios.get(`/data/permisos/${id}`);

export const postPermisoRequest = (permiso) => axios.post(`/data/permisos`, permiso);

export const putPermisoRequest = (id, permiso) => axios.put(`/data/permisos/${id}`, permiso);

export const deletePermisoRequest = (id) => axios.delete(`/data/permisos/${id}`);

// ! Secciones

export const getAllSeccionesRequest = () => axios.get(`/data/secciones`);

export const getSeccionRequest = (id) => axios.get(`/data/secciones/${id}`);

export const getSeccionMenuRequest = () => axios.get(`/data/permisos-menu`);

export const getSeccionesMenuRequest = (id, RolId) => axios.get(`/data/secciones-menu?RolId=${RolId}&UsuarioId=${id}`);


// ! Categorias

export const getAllCategoriasRequest = () => axios.get(`/data/categorias`);

export const getCategoriaRequest = (id) => axios.get(`/data/categorias/${id}`);

// ! Roles

export const getRolesRequest = () => axios.get(`/data/roles`);

export const getRolRequest = (id) => axios.get(`/data/roles/${id}`);

export const putRolRequest = (id, data) => axios.put(`/data/roles/${id}`, data);


// ! Usuarios

export const getUsuariosRequest = () => axios.get(`/data/usuarios`);

export const getUsuarioRequest = (id) => axios.get(`/data/usuarios/${id}`);

export const postUsuarioRequest = (usuario) => axios.post(`/data/usuarios`, usuario);

export const putUsuarioRequest = (id, usuario) => axios.put(`/data/usuarios/${id}`, usuario);

export const putUsuarioPerfilRequest = (id, usuario) => axios.put(`/data/usuarios-perfil/${id}`, usuario);

export const deleteUsuarioRequest = (id) => axios.delete(`/data/usuarios/${id}`);


// ! Detalle Permisos

export const getDetallePermisosByDocumentoRequest = (idUsuario) => axios.get(`/data/detalle-permisos/${idUsuario}`);

export const postDetallePermisoRequest = (detallePermiso) => axios.post(`/data/detalle-permisos`, detallePermiso);

export const deleteDetallePermisosRequest = (PermisoId, UsuarioId) => axios.delete(`/data/detalle-permisos?PermisoId=${PermisoId}&UsuarioId=${UsuarioId}`);

// ! Noticias

export const getAllNoticiasRequest = () => axios.get(`/data/noticias`);

export const getNoticiaRequest = (id) => axios.get(`/data/noticias/${id}`);

export const postNoticiaRequest = (noticia) => axios.post(`/data/noticias`, noticia);

export const putNoticiaRequest = (id, noticia) => axios.put(`/data/noticias/${id}`, noticia);

export const deleteNoticiaRequest = (id) => axios.delete(`/data/noticias/${id}`);

// ! Links

export const getAllLinkRequest = () => axios.get(`/data/links`);

export const getAllLinkPDFRequest = () => axios.get(`/data/links?tipo=pdf`);

export const getAllLinkBlogsRequest = () => axios.get(`/data/links?tipo=blog`);

export const getLinkRequest = (id) => axios.get(`/data/links/${id}`);

export const postLinkRequest = (link) => axios.post(`/data/links`, link);

export const putLinkRequest = (id, link) => axios.put(`/data/links/${id}`, link);

export const deleteLinkRequest = (id) => axios.delete(`/data/links/${id}`);

// ! Anuncios

export const getAllAnunciosRequest = () => axios.get(`/data/anuncios`);

export const getAnuncioRequest = (id) => axios.get(`/data/anuncios/${id}`);

export const postAnuncioRequest = (anuncio) => axios.post(`/data/anuncios`, anuncio, {
    headers: { 'Content-Type': 'multipart/form-data' }
});

export const putAnuncioRequest = (id, anuncio) => axios.put(`/data/anuncios/${id}`, anuncio, {
    headers: { 'Content-Type': 'multipart/form-data' }
});

export const deleteAnuncioRequest = (id) => axios.delete(`/data/anuncios/${id}`);

// ! Tokens

export const getAllTokenRequest = () => axios.get(`/data/tokens`);

export const getTokenRequest = (id) => axios.get(`/data/tokens/${id}`);

export const postTokenRequest = (token) => axios.post(`/data/tokens`, token);

export const putTokenRequest = (id, token) => axios.put(`/data/tokens/${id}`, token);

export const deleteTokenRequest = (id) => axios.delete(`/data/tokens/${id}`);

// ! ITems

export const getAllItemRequest = () => axios.get(`/data/items`);

export const getItemRequest = (id) => axios.get(`/data/items/${id}`);

export const postItemRequest = (item) => axios.post(`/data/items`, item);

export const putItemRequest = (id, item) => axios.put(`/data/items/${id}`, item);

export const deleteItemRequest = (id) => axios.delete(`/data/items/${id}`);

// ! Eventos

export const getAllEventosRequest = () => axios.get(`/data/eventos`);

export const getEventoRequest = (id) => axios.get(`/data/eventos/${id}`);

export const postEventoRequest = (data) => axios.post(`/data/eventos`, data);

export const putEventoRequest = (id, data) => axios.put(`/data/eventos/${id}`, data);

export const deleteEventoRequest = (id) => axios.delete(`/data/eventos/${id}`);

// ! Credenciales Email

export const getCredencialesEmailRequest = () => axios.get(`/data/credenciales`);

export const putCredencialesEmailRequest = (id, data) => axios.put(`/data/credenciales/${id}`, data);
