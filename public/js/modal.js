function confirmDelete(id, action) {
    document.getElementById('deleteItemId').value = id;
    document.getElementById('deleteForm').action = action;
    var myModal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
    myModal.show();
}