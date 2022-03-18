<template>
  <v-container>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6">
          {{ title }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ subtitle }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list
    nav
    >
    <v-list-item
      v-for="item in items"
      :key="item.id"
      link
      :to="item.route"
    >
      <v-list-item-icon>
        <v-icon v-text="item.icon"></v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title :to="item.route">{{ item.title }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    </v-list>
  </v-container>
</template>

<script>

export default {
    data: () => ({
      drawer: false,
      title: "Returns manager",
      subtitle: "Menu",
      items: [
        {
          key: '1',
          icon: 'mdi-home',
          title: 'Home',
          route: '/home'
        },
        {
          key: '2',
          icon: 'mdi-information',
          title: 'About',
          route: '/About'
        },
        {
          key: '3',
          icon: 'mdi-view-list',
          title: 'Returns list',
          route: '/returns-list'
        },
        {
          key: '4',
          icon: 'mdi-plus',
          title: 'Add manual return',
          route: '/add-record'
        }
        
      ]
    }),
}
</script>