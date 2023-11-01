<template>
    <div class="w-full ">
      <!-- Display Notes -->
      <div class="notecard h-[50vh]  mt-10 flex-grow overflow-auto ">
        <div class="wrapper p-2 " v-for="(note, id) in notes" :key="note">
          <div class="paper flex flex-col" v-if="note.editing">
            <!-- Edit Mode -->
            <div class="flex flex-col">
            <textarea class="paper" v-model="note.text" @input="updateNote(id)" @keyup.enter="saveEdit(id)" @keyup.esc="cancelEdit(index)">
            </textarea>
            <div class="flex flex-col z-10">
            <button @click="saveEdit(id)">Save</button>
            <button @click="cancelEdit(id)">Cancel</button>
            </div>
            
            </div>
          
          </div>
          <div class="wrapper flex flex-col" v-else>
            <!-- View Mode -->
            <div class="paper  flex gap-1">
              <p class="w-full ">{{ note.text }}</p>
              <button @click="startEdit(id)">Edit</button>
              <button @click="deleteNote(id)">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 32 32">
                  <path d="M 11 2 L 11 4 L 21 4 L 21 2 L 11 2 z M 4 6 L 4 8 L 28 8 L 28 6 L 4 6 z M 7.9921875 9.875 L 6.0078125 10.125 C 6.0078125 10.125 7 18.074074 7 27 L 7 28 L 25 28 L 25 27 C 25 18.074074 25.992188 10.125 25.992188 10.125 L 24.007812 9.875 C 24.007812 9.875 23.120303 17.398914 23.042969 26 L 8.9570312 26 C 8.8796974 17.398914 7.9921875 9.875 7.9921875 9.875 z M 12.986328 10.835938 L 11.013672 11.164062 C 11.013672 11.164062 12 17.111111 12 23 L 14 23 C 14 16.888889 12.986328 10.835936 12.986328 10.835938 z M 19.013672 10.835938 C 19.013672 10.835938 18 16.888889 18 23 L 20 23 C 20 17.111111 20.986328 11.164064 20.986328 11.164062 L 19.013672 10.835938 z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Add Note -->
      <div class="noteInput-wrapper flex w-full ">
        <div class="noteInput-container w-full  flex flex-col items-end">
          <textarea class="noteText-input p-1 mt-5" v-model="newNote" @keyup.enter="addNote"></textarea>
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
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, where, query } from 'firebase/firestore';
import { db } from '@/firebase';
import { getCurrentUser } from '../auth';

const notes = ref([]);
const newNote = ref('');
let userId; // Define userId here.

const setUser = async () => {
  const user = await getCurrentUser();
  if (user && user.uid) {
    userId = user.uid;
    fetchUserNotes(); // Fetch user-specific notes when userId is available
  } else {
    console.error('User is not authenticated or user data is unavailable.');
  }
};

// Call setUser to set the userId
setUser();

// Function to fetch user-specific notes
const fetchUserNotes = async () => {
  if (!userId) {
    console.error('User is not authenticated or user data is unavailable.');
    return;
  }

  const notesCollection = collection(db, 'notes');
  const notesQuery = query(notesCollection, where('userId', '==', userId));
  const notesSnapshot = await getDocs(notesQuery);

  notes.value = notesSnapshot.docs.map((doc) => ({
    id: doc.id,
    text: doc.data().text,
    editing: false,
  }));
};

// Function to add a new note
const addNote = async () => {
  if (!userId) {
    console.error('User is not authenticated or user data is unavailable.');
    return;
  }

  const notesCollection = collection(db, 'notes');
  const newNoteRef = await addDoc(notesCollection, { text: newNote.value, userId: userId });
  notes.value.push({ id: newNoteRef.id, text: newNote.value, editing: false });
  newNote.value = ''; // Clear the input field
};

// Function to start editing a note
const startEdit = (id) => {
  notes.value[id].editing = true;
};

// Function to update a note (called on each input change)
const updateNote = (id) => {
  // Update the note text in memory
  console.log('updateNote', id);
};

// Function to save an edited note
const saveEdit = async (id) => {
  if (!userId) {
    console.error('User is not authenticated or user data is unavailable.');
    return;
  }

  const note = notes.value[id];
  const noteRef = doc(db, 'notes', note.id);
  await updateDoc(noteRef, { text: note.text });
  note.editing = false;
};

// Function to cancel editing a note
const cancelEdit = (id) => {
  notes.value[id].editing = false;
  // Restore the original note text
};

// Function to delete a note
const deleteNote = async (id) => {
  if (!userId) {
    console.error('User is not authenticated or user data is unavailable.');
    return;
  }

  const note = notes.value[id];
  const noteRef = doc(db, 'notes', note.id);
  await deleteDoc(noteRef);
  notes.value.splice(id, 1); // Remove the note from the local array
};

// Fetch user-specific notes on component mount
onMounted(() => {
  if (userId) {
    fetchUserNotes();
  }
});
</script>

  
<style lang="scss">

.noteText-input {
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