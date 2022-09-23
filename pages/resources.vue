<script lang="ts" setup>
import { Command } from 'vue-command-palette'
</script>

<template>
  <Command theme="custom">
    <Command.Input placeholder="Type a command or search..." />
    <Command.List>
      <Command.Empty>No results found.</Command.Empty>

      <Command.Group heading="Letters">
        <Command.Item>a</Command.Item>
        <Command.Item>b</Command.Item>
        <Command.Separator />
        <Command.Item>c</Command.Item>
      </Command.Group>

      <Command.Item>Apple</Command.Item>
    </Command.List>
  </Command>
</template>

<style>
@import '~/assets/css/custom.css';
</style>
