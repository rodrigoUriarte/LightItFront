<template>

  <div class="min-h-full">
    <!--navbar-->
    <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <img class="h-8 w-8" src="@/assets/lightItLogo.png" alt="Workflow"/>
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <router-link
                  v-for="item in navigation"
                  :key="item.name"
                  :to="item.to"
                  class="text-gray-300 hover:bg-lightit hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >{{ item.name }}
                </router-link>
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <!-- Profile dropdown -->
              <Menu as="div" class="ml-3 relative">
                <div>
                  <MenuButton
                    class="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <Avatar icon="pi pi-user" size="large" style="background-color:#773dbd; color: #ffffff" shape="circle"/>
                  </MenuButton>
                </div>
                <transition enter-active-class="transition ease-out duration-100"
                            enter-from-class="transform opacity-0 scale-95"
                            enter-to-class="transform opacity-100 scale-100"
                            leave-active-class="transition ease-in duration-75"
                            leave-from-class="transform opacity-100 scale-100"
                            leave-to-class="transform opacity-0 scale-95">
                  <MenuItems
                    class="absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <MenuItem class="my-2">
                      <div class="flex items-center px-5">
                        <div class="flex-shrink-0">
                          <Avatar icon="pi pi-user" style="background-color:#773dbd; color: #ffffff" shape="circle"/>
                        </div>
                        <div class="ml-3">
                          <div class="text-base font-medium leading-none">{{ authUser.name }}</div>
                          <div class="text-sm font-medium leading-none">{{ authUser.email }}</div>
                        </div>
                      </div>
                    </MenuItem>
                    <MenuItem>
                      <Button class="w-full justify-center" @click="logout">LOGOUT</Button>
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
          </div>
          <div class="-mr-2 flex md:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton
              class="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span class="sr-only">Open main menu</span>
              <i class="pi pi-bars" v-if="!open" aria-hidden="true"></i>
              <i class="pi pi-times" v-else aria-hidden="true"></i>
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="item.to"
            class="text-gray-300 hover:bg-lightit hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >{{ item.name }}
          </router-link>
        </div>
        <div class="pt-4 pb-3 border-t border-gray-700">
          <div class="flex items-center px-5">
            <div class="flex-shrink-0">
              <Avatar icon="pi pi-user" style="background-color:#773dbd; color: #ffffff" shape="circle"/>
            </div>
            <div class="ml-3">
              <div class="text-base font-medium leading-none text-white">{{ authUser.name }}</div>
              <div class="text-sm font-medium leading-none text-gray-400">{{ authUser.email }}</div>
            </div>
          </div>
          <div class="mt-3 px-2 flex justify-end">
            <Button @click="logout">LOGOUT</Button>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>

    <!--main content-->
    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="px-4 py-6 sm:px-0">
          <RouterView></RouterView>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
  //app layout by https://tailwindui.com/components/application-ui/application-shells/stacked
  import {Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/vue'
  import {useAuthUser} from "@/stores/auth/useAuthUser";
  import {ref} from "vue";

  const authUser = useAuthUser();

  const navigation = ref([
    {name: 'Diagnostics', to: '/diagnostics'},
    {name: 'Historic Diagnostics', to: '/historic'}
  ]);

  const logout = () => {
    authUser.logout();
  }
</script>