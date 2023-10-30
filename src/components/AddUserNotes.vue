<template>
    <div class="w-full">
      <!-- Display Notes -->
      <div class="notecard  h-80 ">
        <div class="wrapper" v-for="(note, id) in notes" :key="note">
          <div class="paper flex flex-col" v-if="note.editing">
            <!-- Edit Mode -->
            <div class="flex flex-col">
            <textarea class="paper" v-model="note.text" @input="updateNote(id)" @keyup.enter="saveEdit(id)" @keyup.esc="cancelEdit(index)">
            </textarea>
            <div class="flex flex-col">
            <button @click="saveEdit(id)">Save</button>
            <button @click="cancelEdit(id)">Cancel</button>
            </div>
            
            </div>
          
          </div>
          <div class="wrapper flex flex-col" v-else>
            <!-- View Mode -->
            <div class="paper flex gap-3">
              <p class="w-fit ">{{ note.text }}</p>
              <button @click="startEdit(id)">Edit</button>
              <button @click="deleteNote(id)"><img src="../components/icons/" alt="">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 32 32">
              <path d="M 11 2 L 11 4 L 21 4 L 21 2 L 11 2 z M 4 6 L 4 8 L 28 8 L 28 6 L 4 6 z M 7.9921875 9.875 L 6.0078125 10.125 C 6.0078125 10.125 7 18.074074 7 27 L 7 28 L 25 28 L 25 27 C 25 18.074074 25.992188 10.125 25.992188 10.125 L 24.007812 9.875 C 24.007812 9.875 23.120303 17.398914 23.042969 26 L 8.9570312 26 C 8.8796974 17.398914 7.9921875 9.875 7.9921875 9.875 z M 12.986328 10.835938 L 11.013672 11.164062 C 11.013672 11.164062 12 17.111111 12 23 L 14 23 C 14 16.888889 12.986328 10.835936 12.986328 10.835938 z M 19.013672 10.835938 C 19.013672 10.835938 18 16.888889 18 23 L 20 23 C 20 17.111111 20.986328 11.164064 20.986328 11.164062 L 19.013672 10.835938 z"></path>
            </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Add Note -->
      <div class=" flex cardbg ">
        <div class="notetext-container  flex flex-col items-end">
          <textarea class="notetext-input p-1" v-model="newNote" @keyup.enter="addNote"></textarea>
            <button class="z-1   " @click="addNote">
              <svg class="add-btn " xmlns="http://www.w3.org/2000/svg" width="17.828" height="17.828">
                  <path d="m2.828 17.828 6.086-6.086L15 17.828 17.828 15l-6.086-6.086 6.086-6.086L15 0 8.914 6.086 2.828 0 0 2.828l6.085 6.086L0 15l2.828 2.828z"/>
              </svg>
          </button>
        </div>
      </div>
    </div>
</template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
  import { db } from '@/firebase'; // Import your initialized Firestore instance
  
  const notes = ref([]);
  const newNote = ref('');
  
  onMounted(async () => {
    // Load existing notes from Firestore
    const notesCollection = collection(db, 'notes');
    const notesSnapshot = await getDocs(notesCollection);
    notes.value = notesSnapshot.docs.map((doc) => ({
      id: doc.id,
      text: doc.data().text,
      editing: false,
    }));
  });
  
  const addNote = async () => {
    // Add a new note to Firestore
    const notesCollection = collection(db, 'notes');
    const newNoteRef = await addDoc(notesCollection, { text: newNote.value });
    notes.value.push({ id: newNoteRef.id, text: newNote.value, editing: false });
    newNote.value = ''; // Clear the input field
  };
  
  const startEdit = (id) => {
    notes.value[id].editing = true;
  };
  
  const updateNote = (id) => {
    // Update the note text in memory
    // This function is called on each input change
    console.log('updateNote', id);
  };
  
  const saveEdit = async (id) => {
    // Save the edited note to Firestore
    const note = notes.value[id];
    const noteRef = doc(db, 'notes', note.id);
    await updateDoc(noteRef, { text: note.text });
    note.editing = false;
  };
  
  const cancelEdit = (id) => {
    // Cancel the edit mode
    notes.value[id].editing = false;
    // Restore the original note text
  };
  
  const deleteNote = async (id) => {
  const note = notes.value[id];
  // Delete the note from Firestore
  const noteRef = doc(db, 'notes', note.id);
  await deleteDoc(noteRef);
  // Remove the note from the local array
  notes.value.splice(id, 1);
};

</script>
  
<style lang="scss">

.notetext-input {
    width: 100%;
    height: 15vh;


    
    input {
        transition: 180ms box-shadow ease-in-out;
        &:focus {
            /* ...existing styles */
        box-shadow: 0 0 0 3px hsla($green, var(--input-focus-s), 
        calc(var(--input-focus-l) + 40%), 0.8);
        outline: 3px solid transparent;

            }
        box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px;
    }
    
}

</style>