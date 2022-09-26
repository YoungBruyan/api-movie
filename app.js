let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () => {
	if (pagina < 1000) {
		pagina += 1;
		cargarPeliculas();
	}
});
btnAnterior.addEventListener('click', () => {
	if (pagina > 1) {
		pagina -= 1;
		cargarPeliculas();
	}
});
const cargarPeliculas = async () => {

	try{
		const resp = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=d43cf20afe8a0d5679458a8301a24c43&language=es-MX&page=${pagina}`)
		// console.log(resp);
		
		if (resp.status === 200) {
			const data = await resp.json();
			let peliculas = '';
			data.results.forEach(pelicula => {
				peliculas += `
					<div class="pelicula">
						<img class="poster" src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}" /> 
						<h3 class="titulo">${pelicula.title}</h3>
					</div>
				`;
			});
			document.getElementById('contenedor').innerHTML = peliculas;
			
		}else if(resp.status === 401){
			console.log('Pusiste la llave mal');
		}else if(resp.status === 404){ 
			console.log('La pelicula que buscas no existe');
		}else{
			console.log('Hubo un error inesperado. Intentelo mas tarde');
		}
		
	}catch(error){
		console.log( error );
	}
}


cargarPeliculas();