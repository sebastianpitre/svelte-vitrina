<script>
  import { Router, Route, link } from 'svelte-routing';
  import Home from './Home.svelte';
  import Login from './routes/Login.svelte';
  import Products from './routes/Products.svelte'; // Importa el componente Products
  import Perfil from './routes/perfil-2.svelte';
  import Categorys from './routes/Categorys.svelte';

</script>

<Router>
  <main>
      <Route path="/" component={Home} exact />
      <Route path="/login" component={Login} />
      <Route path="/perfil" component={Perfil} />
      <Route path="/categorias" component={Categorys} />
      <Route path="/products" component={Products} /> <!-- Añade la ruta para Products -->
  </main>
</Router>
