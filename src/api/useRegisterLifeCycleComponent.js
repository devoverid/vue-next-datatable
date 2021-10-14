import {
  onActivated,
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onDeactivated,
  onErrorCaptured,
  onMounted,
  onRenderTracked,
  onRenderTriggered,
  onUnmounted,
  onUpdated,
} from 'vue'

export default function useRegisterLifeCycleComponent(nextDatatable) {
  onBeforeMount(() => nextDatatable.emit('on:before-mount'))
  onMounted(() => nextDatatable.emit('on:mounted'))
  onBeforeUnmount(() => nextDatatable.emit('on:before-unmount'))
  onUnmounted(() => nextDatatable.emit('on:unmounted'))
  onErrorCaptured((err) => nextDatatable.emit('on:error-captured', err))
  onActivated(() => nextDatatable.emit('on:activated'))
  onDeactivated(() => nextDatatable.emit('on:deactivated'))
}
