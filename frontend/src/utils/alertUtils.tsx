// src/utils/alertUtils.ts
import Swal from "sweetalert2";

export const showSuccessAlert = (title: string, text: string, confirmButtonText = "OK") => {
    return Swal.fire({
        icon: "success",
        title,
        text,
        confirmButtonText,
    });
};

export const showErrorAlert = (title: string, text: string, confirmButtonText = "Try Again") => {
    return Swal.fire({
        icon: "error",
        title,
        text,
        confirmButtonText,
    });
};

export const showWarningAlert = (
    title: string,
    text: string,
    confirmButtonText = "Proceed",
    cancelButtonText = "Cancel"
) => {
    return Swal.fire({
        icon: "warning",
        title,
        text,
        showCancelButton: true,
        confirmButtonText,
        cancelButtonText,
    });
};
