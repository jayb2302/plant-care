<template>
    <div>
      <!-- Display Notes -->
      <div class="notecard  h-80">
     
      <div class="wrapper" v-for="(note, id) in notes" :key="note">
      .

        <div class="wrapper paper flex flex-col" v-if="note.editing">
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
          <div class="paper flex ">
            <p class="w-fit ">{{ note.text }}</p>
            <button @click="startEdit(id)">Edit</button>
            <button @click="deleteNote(id)">Delete</button>
          </div>
        </div>
      </div>
   </div>
      <!-- Add Note -->
      <div class=" flex p-1 cardbg ">
      <div class="notetext-container">
        <textarea class="notetext-input p-1" v-model="newNote" @keyup.enter="addNote"></textarea>
       <button class="z-1" @click="addNote">
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