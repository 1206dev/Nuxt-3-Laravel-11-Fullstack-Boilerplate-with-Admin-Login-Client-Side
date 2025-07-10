<template>
  <div>
    <select
      :id="select2Id"
      v-model="iValue"
      :disabled="disabled"
      class="select2 form-control select2-custom"
      :multiple="multiple"
    >
      <option
        v-if="!multiple && label"
        value=""
      >
        --- {{ label }} ---
      </option>
      <option
        v-for="(item, key) in listOptions"
        :key="key"
        :value="item.id"
        :data-icon="item.icon"
      >
        {{ item.text }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  value: [String, Number, Array],
  list: {
    type: [Object, Array],
    default: [],
  },
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  multiple: Boolean,
  disabled: {
    type: Boolean,
    default: false,
  },
  minimumInputLength: {
    type: Number,
    default: 0,
  },
  allowClear: {
    type: Boolean,
    default: true,
  },
  labelIncludeValue: {
    type: Boolean,
    default: false,
  },
  searchFirstWord: {
    type: Boolean,
    default: false,
  },
  searchLastWord: {
    type: Boolean,
    default: false,
  },
})

const generateRandomId = () => {
  return 'select-2-' + Math.random().toString(36).substr(2, 9)
}

const select2Id = computed(() => generateRandomId())

const emit = defineEmits()

const listOptions = computed(() => {
  return props.list && props.list.map((item) => {
    return {
      id: item.id,
      text: props.labelIncludeValue ? (item.id + ' - ' + item.text) : item.text,
      ...(item.icon && {
        icon: item.icon,
      }),
    }
  })
})

const select2Value = computed(() => {
  return props.value
})

let iValue
iValue = props.value
const selectedOption = ref({})

const filterMatchFunc = function (params, data) {
  if ($.trim(params.term) === '') {
    return data
  }
  let tmpTerm = params.term
  if (!tmpTerm.startsWith(' ')) {
    tmpTerm = ' ' + tmpTerm
  }

  if (props.searchFirstWord && props.searchLastWord) {
    if (data.text.toLowerCase().startsWith(params.term.toLowerCase()) || data.text.toLowerCase().endsWith(tmpTerm.toLowerCase())) {
      return data
    }
    return null
  }
  else if (props.searchLastWord) {
    if (data.text.toLowerCase().endsWith(tmpTerm.toLowerCase())) {
      return data
    }
    return null
  }
  else if (props.searchFirstWord) {
    if (data.text.toLowerCase().startsWith(params.term.toLowerCase())) {
      return data
    }
    return null
  }
  return $.fn.select2.defaults.defaults.matcher(params, data)
}

const initSelect2 = () => {
  const selectElement = document.getElementById(select2Id.value)

  if (selectElement) {
    $(selectElement).select2({
      placeholder: props.placeholder || t('Select'),
      allowClear: !props.multiple && props.allowClear,
      minimumResultsForSearch: Number.POSITIVE_INFINITY,
      minimumInputLength: props.minimumInputLength,
      templateSelection: formatIconOption,
      templateResult: formatIconOption,
      matcher: filterMatchFunc,
    }).on('select2:select', (e: unknown) => {
      if (props.multiple) {
        if (Array.isArray(iValue)) {
          const tmp = [...iValue]
          tmp.push(e.params.data.id)
          iValue = tmp
        }
        else {
          iValue = [e.params.data.id]
        }
      }
      else {
        iValue = e.params.data.id
      }
      selectedOption.value[e.params.data.id] = e.params.data.text
      emit('input', iValue)
      emit('selectedOption', selectedOption.value)
    }).on('select2:unselect', (e: unknown) => {
      if (props.multiple) {
        const tmp = [...iValue]
        const index = tmp.indexOf(e.params.data.id)
        if (index !== -1) {
          tmp.splice(index, 1)
          iValue = tmp
        }
        if (iValue.length === 0) {
          iValue = ''
        }
      }
      else {
        iValue = ''
      }
      emit('input', iValue)
    })
  }
}

const formatIconOption = (icon) => {
  return $('<span><i class="fas ' + $(icon.element).data('icon') + '"></i> ' + icon.text + '</span>')
}

onMounted(() => {
  setTimeout(() => {
    initSelect2()
  }, 100)
})

watch(select2Value, async (value) => {
  iValue = value
  const selectElement = document.getElementById(select2Id.value)
  if (selectElement) {
    emit('input', iValue)
    $(selectElement).select2({
      placeholder: t('Select'),
      allowClear: !props.multiple && props.allowClear,
      minimumResultsForSearch: Number.POSITIVE_INFINITY,
      minimumInputLength: props.minimumInputLength,
      templateSelection: formatIconOption,
      templateResult: formatIconOption,
      matcher: filterMatchFunc,
    }).val(iValue).trigger('change')
  }
})

watch(listOptions, (value, oldValue) => {
  if (!compare2Object(value, oldValue)) {
    const selectElement = document.getElementById(select2Id.value)
    if (selectElement) {
      iValue = ''
      emit('input', iValue)
      $(selectElement).select2({
        placeholder: t('Select'),
        allowClear: !props.multiple && props.allowClear,
        minimumResultsForSearch: Number.POSITIVE_INFINITY,
        minimumInputLength: props.minimumInputLength,
        templateSelection: formatIconOption,
        templateResult: formatIconOption,
        matcher: filterMatchFunc,
      }).val('').trigger('change')
    }
  }
})
</script>

<style scoped>
  .select2-custom {
    width: 100%;
  }
</style>
