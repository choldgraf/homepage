function showDiscalimerModal() {
    var HUB_MODAL_STORAGE_KEY = 'humModalDismissed';
    var showModal = localStorage.getItem(HUB_MODAL_STORAGE_KEY) === null? true: !(localStorage.getItem(HUB_MODAL_STORAGE_KEY) === 'true');
  
    if (showModal) $('#disclaimer-modal').modal('show');
  
    $('#disclaimer-modal').on('hidden.bs.modal', function (e) {
      var doNotShowNextTime = $('#disclaimer-modal-checkbox')[0].checked;
      localStorage.setItem(HUB_MODAL_STORAGE_KEY, doNotShowNextTime);
    })
}
$(function() {
    /* show disclaimer modal */
   showDiscalimerModal()
})
