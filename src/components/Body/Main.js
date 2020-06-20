import React from 'react';
import styles from './css/Main.module.css';
import Sidebar from './Sidebar.js';

//Entry point for the main body
function Main(props) {
	return (
		<div id={styles.main} className="p-1 d-flex pt-2">
			<Sidebar />
		</div>
	);
}

export default Main;
