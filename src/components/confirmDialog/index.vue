<template>
    <div v-if="showConfirmDialog" class="confirm-dialog">
        <div class="dialog-content">
            <p>{{ message }}</p>
            <div class="button-container">
                <button @click="confirm">确认</button>
                <button @click="cancel">取消</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const showConfirmDialog = ref(false);
const message = ref('');

const confirm = () => {
    // 触发确认事件
    emit('confirm');
    showConfirmDialog.value = false;
};

const cancel = () => {
    // 触发取消事件
    emit('cancel');
    showConfirmDialog.value = false;
};

const open = (msg) => {
    message.value = msg;
    showConfirmDialog.value = true;
};

</script>

<style scoped>
.confirm-dialog {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
}

.dialog-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
}

.button-container {
    margin-top: 10px;
}

.button-container button {
    margin: 0 10px;
    padding: 5px 10px;
}
</style>