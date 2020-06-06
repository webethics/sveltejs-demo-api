<script>
    import {
      Button, Modal, ModalBody, ModalFooter, ModalHeader, Form, FormGroup, FormText, Input, Label
    } from "sveltestrap";

    import { createEventDispatcher } from 'svelte';
    import { onMount } from 'svelte';

    export let isOpen;
    export let userData;

    let user = {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        age: '',
    };

    const dispatch = createEventDispatcher();

    onMount(() => {
        user = {};
        if (userData) {
          user = userData;
        }
    });

    function toggleModal() {
        dispatch('toggle');
    }

    function saveUser() {
        dispatch('saveUser', { user });
    }

    function updateUser() {
        dispatch('updateUser', { user });
    }

</script>

<div>
    <Modal isOpen = {isOpen}>
        <ModalHeader> {user.id ? 'Edit' : 'Add'} User</ModalHeader>
        <ModalBody>
            <Form>
                <FormGroup>
                    <Input
                        type="text"
                        bind:value={user.first_name}
                        placeholder="First Name"
                        />
                </FormGroup>
                <FormGroup>
                    <Input
                        type="text"
                        bind:value={user.last_name}
                        placeholder="Last Name" />
                </FormGroup>
                <FormGroup>
                    <Input
                        type="email"
                        bind:value={user.email}
                        readonly={user.id}
                        placeholder="Email" />
                </FormGroup>
                <FormGroup>
                    <Input
                        type="text"
                        bind:value={user.age}
                        placeholder="Age" />
                </FormGroup>
                <FormGroup>
                    <Input
                        type="text"
                        bind:value={user.phone}
                        placeholder="Phone Number" />
                </FormGroup>
            </Form>
        </ModalBody>
        <ModalFooter>
            {#if user.id}
              <Button color="primary" on:click="{updateUser}" >
                  Update
              </Button>
            {:else}
              <Button color="primary" on:click="{saveUser}">
                  Save
              </Button>
            {/if}
            <Button color="secondary" on:click="{toggleModal}">
              Cancel
            </Button>
        </ModalFooter>
    </Modal>
</div>
