<template lang="html">
  <div>
    <vs-tabs>
      <vs-tab v-for="(v, k) in kb" :label="v.label" :key="k">
        <div class="con-tab-ejemplo">
          <vs-table :data="v.values">
            <template slot="thead">
              <vs-th class="bg-grey-light rounded-tl"> Key</vs-th>
              <vs-th class="bg-grey-light rounded-tr"> Value</vs-th>
            </template>

            <template slot-scope="{ data }">
              <vs-tr :key="i" v-for="(value, i) in data">
                <vs-td :data="value.key"> {{ value.key }} </vs-td>

                <vs-td :data="value.value" class="break-normal">
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
        </div>
      </vs-tab>
    </vs-tabs>
  </div>
</template>

<script>
export default {
  data: () => ({
    obj: {
      1: "hi",
      2: "hello"
    },
    kb: {
      greetings: {
        label: "Greetings",
        values: [
          {
            key: "welcome",
            value: "Hello"
          },
          {
            key: "thankYou",
            value: "Thanks"
          }
        ]
      },
      persistantMenu: {
        label: "Persistan Menu",
        values: [
          {
            key: "welcome",
            value: "Hello"
          },
          {
            key: "thankYou",
            value: "Thanks"
          }
        ]
      }
    }
  })
};
</script>
