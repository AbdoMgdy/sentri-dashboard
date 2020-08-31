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
                        :id="`save-${i}`"
                        color="success"
                        type="filled"
                        class="vs-con-loading__container"
                        @click="editKnowledge(k, value[0], value[1], i)"
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
    editKnowledge(category, key, value, i) {
      let knowledgev = {
        category,
        key,
        value
      };
      console.log(knowledgev);
      this.$vs.loading({
        background: "#00e600",
        color: "#fff",
        container: `#save-${i}`,
        scale: 0.45
      });
      this.$store
        .dispatch("catalog/editKnowledgeValue", knowledgev)
        .then(() => {
          this.$vs.loading.close(`#save-${i}>.con-vs-loading`);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {}
};
</script>

<style scoped>
table {
  table-layout: fixed;
}
</style>
