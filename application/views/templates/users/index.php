<div class="content-principal">
  <div class="row">
    <div class="small-12 columns">
      <h1>Lista de Contatos</h1>
    </div>
    <div class="small-12 columns">
      <table width="100%" id="table-contato">
        <thead>
          <tr>
            <th >Nome</th>
            <th >Apelido</th>
            <th >Telefone</th>
          </tr>
        </thead>
        <tbody>

          <?php 
            foreach ($contatos as $contato) {
         ?> 
          <tr>
            <td><?= $contato['name']?></td>
            <td><?= $contato['surname']?></td>
            <td><?= $contato['phone']?></td>
          </tr>
         <?php  
            }
           ?>
        </tbody>
      </table>
    </div>
  </div>
  <div class="row">
    <div class="small-12 columns text-right">
      <a href="<?= base_url()?>ci_users/logout" class="button">SAIR</a>
    </div>
  </div>
</div>


<script>
$(document).ready(function(){
  $('#table-contato').dataTable({
  });
});
</script>