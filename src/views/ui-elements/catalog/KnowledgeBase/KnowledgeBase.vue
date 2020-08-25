<template lang="html">
  <div>
    <vs-tabs>
      <vs-tab v-for="(v, k) in knowledge" :label="v.label" :key="k">
        <div class="con-tab-ejemplo">
          <vs-table :data="Object.entries(v.values)">
            <template slot="thead">
              <vs-th class="bg-grey-light rounded-tl w-1/5">Key</vs-th>
              <vs-th class="bg-grey-light rounded-tr w-4/5">Value</vs-th>
            </template>

            <template slot-scope="{ data }">
              <vs-tr :key="i" v-for="(value, i) in data">
                <vs-td :data="value" class="break-words">
                  {{ value[0] }}
                </vs-td>

                <vs-td :data="value" class="break-words">
                  {{ value[1] }}

                  <template slot="edit">
                    <div class="flex flex-col items-center w-full">
                      <vs-textarea
                        class="inputx"
                        width="57%"
                        v-model="value[1]"
                      />
                      <vs-button
                        color="success"
                        type="filled"
                        class="vs-con-loading__container"
                        @click="editKnowledge(k, value[0], value[1])"
                        >Save</vs-button
                      >
                    </div>
                  </template>
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
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
    editKnowledge(category, key, value) {
      let knowledgev = {
        category,
        key,
        value
      };
      console.log(knowledgev);
      this.$store
        .dispatch("catalog/editKnowledgeValue", knowledgev)
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    console.log(this.knowledge);
  }
};
</script>

<style scoped>
table {
  table-layout: fixed;
}
</style>
