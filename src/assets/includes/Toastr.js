import toastr from "toastr";

toastr.options = {
    "positionClass": "toast-top-right",
    "progressBar": true,
    "onclick": null,
    "showDuration": "300",
    "closeButton": true,
    "hideDuration": "1000",
    "timeOut": "5000",
    "preventDuplicates":false
}

export default toastr;