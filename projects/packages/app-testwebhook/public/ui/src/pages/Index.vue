<template>
  <q-page padding>
    <div class="row">
    <div class="col-12">
      <q-input v-model="url" readonly dense />
    </div>
    <div class="col-12 row q-mt-sm">
      <div class="col-3">
        <q-list bordered separator  v-if="payload.length">
      <q-item v-for="(item, index) in payload" :key="index" >
         <q-item-section>
           <q-item-label>
            <q-btn @click="onClick(index)" flat no-caps class="q-mr-lg" > {{ item.topic }}</q-btn>
            <q-btn icon="close" color="red" dense flat @click="onRemove(index)" size="xs" class="q-pa-none right"></q-btn>
           </q-item-label>
        </q-item-section>
      </q-item>
      </q-list>
    </div>
    <div class="col-9 q-pl-md">
        <pre v-if="activePayload.data">{{ activePayload.data }}</pre>
    </div>
    </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { io } from 'socket.io-client'
import { LocalStorage, uid } from 'quasar'

export default defineComponent({
  name: 'PageIndex',
  components: { },
  setup () {
    const client = io()
    const payload = reactive<Array<{[key:string]: unknown }>>([])
    const activePayload = reactive<{data: string | null }>({ data: null })
    const url = ref(window.location.origin)
    const prefix: string = LocalStorage.getItem('prefix') || uid()

    let activePayloadIndex = -1

    LocalStorage.set('prefix', prefix)
    url.value += `/webhook/${prefix}`

    client.on('connect', () => {
      client.emit('uid', prefix)
    })

    client.on('new_payload', (data: {[key: string]: unknown }) => {
      if (payload.length > 500) {
        onClear()
      }
      payload.push(data)
      if (payload.length === 1) {
        onClick(0)
      }
    })

    const onClick = (index: number) => {
      activePayloadIndex = index
      activePayload.data = JSON.stringify(payload[index], undefined, 2).trim()
    }

    const onRemove = (index: number) => {
      payload.splice(index, 1)
      if (activePayloadIndex === index) {
        activePayload.data = null
      }
    }

    const onClear = () => {
      if (payload.length) {
        payload.splice(0)
        activePayload.data = null
      }
    }

    return {
      payload,
      activePayload,
      url,
      onClick,
      onRemove,
      onClear
    }
  }
})
</script>
