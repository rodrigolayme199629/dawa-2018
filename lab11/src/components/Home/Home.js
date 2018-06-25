import React from 'react';
import imgGato from '../../assets/Vista.jpg';

const home = () => (<div>
	<h1>Pagina de inicio de nuestro Blog</h1>
	<img src={imgGato} alt="Vista" style={{maxHeight: '250px'}}/>
</div>);

export default home;