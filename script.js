import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-fc130-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementListInDB = ref(database, "endorsement list")

const inputEl = document.getElementById("input-el")
const publishBtn = document.getElementById("publish-btn")
const endorsementList = document.getElementById("endorsement-list")

publishBtn.addEventListener("click", function() {
    let inputValue = inputEl.value

    push(endorsementListInDB, inputValue)
    
    clearInputEl()
})

onValue(endorsementListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())

        clearEndorsementList()

        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]

            appendItemToEndorsementList(currentItemID, currentItemValue)
           
        }
    } else {
        endorsementList.innerHTML = "<li>No endorsements here... yet</li>"
    }
})

function clearInputEl() {
    inputEl.value = ""
}

function clearEndorsementList() {
    endorsementList.innerHTML = ""
}

function appendItemToEndorsementList(itemID, itemValue) {
    let newEl = document.createElement("li")

    newEl.textContent = itemValue

    newEl.addEventListener("click", function() {
        let exactLocationOfEndorsementInDb = ref(database, `endorsement list/${itemID}`)
            remove (exactLocationOfEndorsementInDb)
    })

    endorsementList.append(newEl)
}