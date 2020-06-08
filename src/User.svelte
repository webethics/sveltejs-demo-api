<script>
  import { onMount } from 'svelte';
  import { Table } from 'sveltestrap';
  import UserModal from './UserModal.svelte';

  let users = [];
  let showUserModal = false;
  let message  = '';
  let user = {};

  onMount(() => {
      getAllUsers();
  });

  function getAllUsers() {
      axios.get('read.php').then(response => {
          users = response.data.data;
      }).catch(error => {});
  }

  function editUser(id) {
      axios.get(`single_read.php?id=${id}`).then(response => {
          user = response.data;
          showUserModal = true;
      }).catch(error => {
          showUserModal = false;
      });
  }

  function deleteUser(id) {
      if (confirm("Do you really want to delete?")) {
          axios.post('delete.php', { id: id }).then(response => {
            users = users.filter(user => user.id !== id);
            message = 'User Deleted Successfully!';
          }).catch(error => {});
      }
  }

  function toggleModal() {
      showUserModal = !showUserModal;
      if (!showUserModal) {
          user = {};
      }
  }

  function saveUser(event) {
    axios.post('create.php', event.detail.user).then(response => {
        if (response.data.id) {
            users = [...users, response.data];
            message = 'New User Added Successfully!';
        }
        showUserModal = false;
    }).catch(error => {
        showUserModal = false;
    });
  }

  function updateUser(event) {
    axios.post('update.php', event.detail.user).then(response => {
      const index = users.findIndex((user => user.id == response.data.id));
      users[index] = response.data;
      message = 'User Updated Successfully!';
      user = {};
      showUserModal = false;
    }).catch(error => {
        showUserModal = false;
    });
  }

</script>
{#if message}
  <div class="alert alert-success" role="alert">
      {message}
  </div>
{/if}
<div class="table-responsive">
  <button class="btn btn-info float-right mb-5" on:click|preventDefault = {toggleModal}>
      <i class="fas fa-user"></i>&nbsp;&nbsp;
      Add New User
  </button>
  <Table class="table table-striped" bordered >
      <thead>
        <tr>
            <th>#</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Phone Number</th>
            <th>Edit</th>
            <th>Delete</th>
        </tr>
      </thead>
      <tbody>
      {#if users}
        {#each users as user, key}
          <tr>
              <th scope="row">{++key}</th>
              <td> { user.email } </td>
              <td> { user.first_name } </td>
              <td> { user.last_name } </td>
              <td> { user.age } </td>
              <td> { user.phone } </td>
              <td>
                  <button on:click|preventDefault = { editUser(user.id) }>
                    <i class="fas fa-edit fa-2x"> </i>
                  </button>
              </td>
              <td>
                  <button on:click|preventDefault = { deleteUser(user.id) }>
                      <i class="fas fa-trash fa-2x text-danger"> </i>
                  </button>
              </td>
          </tr>
        {/each}
      {/if}
      </tbody>
  </Table>
</div>

{#if showUserModal}
  <UserModal
      isOpen="{showUserModal}"
      on:toggle="{toggleModal}"
      on:saveUser="{saveUser}"
      on:updateUser="{updateUser}"
      userData="{user}"
  />
{/if}
