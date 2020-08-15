<template lang="html">
  <div>
    <vs-tabs v-if="knowledge.comments">
      <vs-tab v-for="(v, k) in knowledge" :label="v.label" :key="k">
        <div class="con-tab-ejemplo">
          <vs-table :data="v.values">
            <template slot="thead">
              <vs-th class="bg-grey-light rounded-tl w-1/5"> Key</vs-th>
              <vs-th class="bg-grey-light rounded-tr w-4/5"> Value</vs-th>
            </template>

            <template slot-scope="{ data }">
              <vs-tr :key="i" v-for="(value, i) in data">
                <vs-td :data="value.key" class="break-words">
                  {{ value.key }}
                </vs-td>

                <vs-td :data="value.value" class="break-words">
                  {{ value.value }}

                  <template slot="edit">
                    <vs-textarea
                      class="inputx"
                      width="50%"
                      v-model="value.value"
                    />
                  </template>
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
          <vs-button
            color="success"
            class="float-right mt-4"
            type="filled"
            @click="editKnowledge"
            >Save</vs-button
          >
        </div>
      </vs-tab>
    </vs-tabs>
  </div>
</template>

<script>
export default {
  data: () => ({}),
  computed: {
    knowledge() {
      return this.$store.getters["catalog/knowledge"];
    }
  },
  methods: {
    editKnowledge() {
      console.log(this.$store.getters["catalog/knowledge"].greetings);
      let knowledgev = {
        gretings: this.$store.getters["catalog/knowledge"].greetings,
        comments: this.$store.getters["catalog/knowledge"].comments
      };
      console.log(knowledgev);
      this.$store
        .dispatch("catalog/editKnowledgeValue", knowledgev)
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
table {
  table-layout: fixed;
}
</style>
