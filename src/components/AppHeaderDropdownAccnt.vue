<template>
  <CDropdown variant="nav-item">
    <CDropdownToggle placement="bottom-end" class="py-0" :caret="false">
            <CAvatar :src="avatar" size="md" />
    </CDropdownToggle>
    <CDropdownMenu class="pt-0">
      <CDropdownHeader component="h6" class="bg-light fw-semibold py-2">
        Cuenta
      </CDropdownHeader>
      <CDropdownItem> <CIcon icon="cil-user" />  {{ authUser?.name}} </CDropdownItem>
      <CDropdownDivider />
      <CDropdownItem @click="logout">
        <CIcon icon="cil-lock-locked" /> Serrar sesión
      </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
</template>

<script setup>
import avatar from '../assets/images/avatars/2.jpg'
const props = defineProps({
  logout:{
    type: Function,
    required: true
  },
  authUser:{
    type: Object,
    default: null,
    required: true
  }
})

</script>
