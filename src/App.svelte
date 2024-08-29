<script>
  import { Router, Route, link } from 'svelte-routing';
  import Home from './Home.svelte';
  import Login from './routes/Login.svelte';
  import Cuenta from './routes/cuenta.svelte';
  import Categorys from './routes/Categorys.svelte';
  import Productos from './routes/productos.svelte';
  import Perfil from './routes/perfil.svelte';

</script>

<Router>
  <main>
      <Route path="/" component={Home} exact />
      <Route path="/login" component={Login} />
      <Route path="/cuenta" component={Cuenta} />
      <Route path="/perfil" component={Perfil} />
      <Route path="/categorias" component={Categorys} />
      <Route path="/productos" component={Productos} />
  </main>
</Router>
