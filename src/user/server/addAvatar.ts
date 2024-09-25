import { FilesCollection } from 'meteor/ostrio:files'

export const Images = new FilesCollection({
  collectionName: 'Avatars',
  allowClientCode: true, // Required to let you remove uploaded file
  onBeforeUpload(file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.ext)) {
      return true
    }
    return 'Please upload image, with size equal or less than 10MB'
  },
})
