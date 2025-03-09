<template>
  <div class="chat-container">
    <!-- 聊天消息区域 -->
    <div class="messages">
      <div v-for="msg in messages" :key="msg.id" class="message-wrapper"
        :class="{ 'own': msg.sender === 'me', 'selected': selectedMessageIds.includes(msg.id) }"
        @contextmenu.prevent="showContextMenu($event, msg)" @touchstart="startLongPressTimer(msg)"
        @touchend="clearLongPressTimer" @mousedown="startLongPressTimer(msg)" @mouseup="clearLongPressTimer">
        <!-- 多选复选框 -->
        <div v-if="isMultiSelectMode" class="checkbox">
          <input type="checkbox" :checked="selectedMessageIds.includes(msg.id)"
            @change="toggleMessageSelection(msg.id)">
        </div>

        <!-- 消息气泡 -->
        <div class="message-bubble">
          <!-- 引用内容 -->
          <div v-if="msg.reference" class="reference-preview">
            <span class="reference-text">{{ msg.reference.content }}</span>
          </div>

          <!-- 消息主体 -->
          <div class="content">{{ msg.content }}</div>

          <!-- 消息状态 -->
          <div class="meta">
            <span class="time">{{ formatTime(msg.timestamp) }}</span>
            <span v-if="msg.isWithdrawn" class="withdrawn">已撤回</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 上下文菜单 -->
    <div v-if="showMenu" class="context-menu" :style="{ top: menuPosition.y + 'px', left: menuPosition.x + 'px' }">
      <div v-if="canWithdraw(currentMessage)" @click="withdrawMessage">撤回</div>
      <div @click="quoteMessage">引用</div>
      <div @click="startMultiSelect">多选</div>
      <div @click="copyMessage">复制</div>
      <div @click="deleteMessage">删除</div>
    </div>

    <!-- 输入区域 -->
    <div class="input-area">
      <!-- 引用展示 -->
      <div v-if="referencedMessage" class="quote-preview">
        引用: {{ referencedMessage.content }}
        <span class="cancel-quote" @click="cancelQuote">×</span>
      </div>

      <textarea v-model="newMessage" @keydown.enter.exact.prevent="sendMessage"></textarea>
      <button @click="sendMessage">发送</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { type ChatMsg } from "./index.d"
// 消息数据结构
const messages = ref<Array<ChatMsg.Message>>([
  {
    id: 1,
    content: '你好！',
    sender: 'me',
    timestamp: Date.now() - 2 * 60 * 1000, // 2分钟前
    reference: null,
    isWithdrawn: false
  },
  {
    id: 2,
    content: '有什么可以帮助你的？',
    sender: 'other',
    timestamp: Date.now() - 1 * 60 * 1000, // 1分钟前
    reference: null,
    isWithdrawn: false
  }
])

// 状态管理
const newMessage = ref<string>('')
const referencedMessage = ref<ChatMsg.Message | null>(null)
const showMenu = ref<boolean>(false)
const menuPosition = ref<{ x: number, y: number }>({ x: 0, y: 0 })
const currentMessage = ref<ChatMsg.Message | null>(null)
const isMultiSelectMode = ref<boolean>(false)
const selectedMessageIds = ref<number[]>([])
let longPressTimer: number | null = null

// 工具函数
const formatTime = (timestamp: number) => {
  return new Date(timestamp).toLocaleTimeString()
}

const canWithdraw = (msg: ChatMsg.Message | null) => {
  if (msg) {
    return msg.sender === 'me' &&
      Date.now() - msg.timestamp < 180000 && // 3分钟
      !msg.isWithdrawn
  }
}

// 事件处理
const showContextMenu = (event: MouseEvent, msg: ChatMsg.Message) => {
  currentMessage.value = msg
  menuPosition.value = {
    x: event.clientX,
    y: event.clientY
  }
  showMenu.value = true
}

const startLongPressTimer = (msg: ChatMsg.Message) => {
  longPressTimer = setTimeout(() => {
    currentMessage.value = msg
    showMenu.value = true
  }, 1000) // 1秒长按触发
}

const clearLongPressTimer = () => {
  if (longPressTimer !== null) {
    clearTimeout(longPressTimer)
    longPressTimer = null
  }
}

const withdrawMessage = () => {
  messages.value = messages.value.map(msg =>
    msg.id === currentMessage.value!.id ?
      { ...msg, isWithdrawn: true } : msg
  )
  closeMenu()
}

const quoteMessage = () => {
  referencedMessage.value = currentMessage.value
  closeMenu()
}

const startMultiSelect = () => {
  isMultiSelectMode.value = true
  closeMenu()
}

const toggleMessageSelection = (id: number) => {
  const index = selectedMessageIds.value.indexOf(id)
  if (index > -1) {
    selectedMessageIds.value.splice(index, 1)
  } else {
    selectedMessageIds.value.push(id)
  }
}

const deleteMessage = () => {
  if (isMultiSelectMode.value) {
    messages.value = messages.value.filter(
      msg => !selectedMessageIds.value.includes(msg.id)
    )
    selectedMessageIds.value = []
    isMultiSelectMode.value = false
  } else {
    messages.value = messages.value.filter(
      msg => msg.id !== currentMessage.value!.id
    )
  }
  closeMenu()
}

const copyMessage = async () => {
  if (currentMessage.value && currentMessage.value.content) {
    try {
      await navigator.clipboard.writeText(currentMessage.value.content)
      alert('已复制到剪贴板')
    } catch (err) {
      console.error('复制失败:', err)
    }
    closeMenu()
  }

}

const sendMessage = () => {
  if (!newMessage.value.trim()) return

  const newMsg = {
    id: Date.now(),
    content: newMessage.value.trim(),
    sender: 'me',
    timestamp: Date.now(),
    reference: referencedMessage.value,
    isWithdrawn: false
  }

  messages.value.push(newMsg)
  newMessage.value = ''
  referencedMessage.value = null
}

const cancelQuote = () => {
  referencedMessage.value = null
}

const closeMenu = () => {
  showMenu.value = false
  currentMessage.value = null
}

// 全局点击关闭菜单
const handleClickOutside = (event: MouseEvent) => {
  if (!(event.target as HTMLElement).closest('.context-menu')) {
    closeMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.chat-container {
  max-width: 800px;
  margin: 0 auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.message-wrapper {
  display: flex;
  margin: 10px 0;
  transition: background 0.3s;
}

.message-wrapper.own {
  justify-content: flex-end;
}

.message-wrapper.selected {
  background: #e3f2fd;
}

.message-bubble {
  max-width: 70%;
  padding: 12px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
}

.own .message-bubble {
  background: #0084ff;
  color: white;
}

.reference-preview {
  border-left: 3px solid #ddd;
  padding-left: 8px;
  margin-bottom: 8px;
  color: #666;
  font-size: 0.9em;
}

.meta {
  font-size: 0.8em;
  margin-top: 4px;
  opacity: 0.8;
  display: flex;
  justify-content: space-between;
}

.withdrawn {
  font-style: italic;
  opacity: 0.6;
}

.context-menu {
  position: fixed;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  padding: 8px 0;
  z-index: 1000;
}

.context-menu div {
  padding: 8px 16px;
  cursor: pointer;
}

.context-menu div:hover {
  background: #f5f5f5;
}

.input-area {
  padding: 20px;
  border-top: 1px solid #eee;
  background: #fff;
}

textarea {
  width: 100%;
  height: 80px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  resize: none;
}

button {
  margin-top: 10px;
  padding: 8px 16px;
  background: #0084ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.quote-preview {
  background: #f8f9fa;
  padding: 8px;
  border-radius: 4px;
  margin-bottom: 8px;
  position: relative;
}

.cancel-quote {
  cursor: pointer;
  margin-left: 8px;
}

.checkbox {
  padding: 8px;
  display: flex;
  align-items: center;
}
</style>
