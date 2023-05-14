import useCurrentUser from "@/hooks/useCurrentUser"
import useUser from "@/hooks/useUser"
import useEditModal from "@/hooks/useEditModal"
import { useState, useEffect, useCallback } from "react"
import toast from "react-hot-toast"
import axios from "axios"
import Modal from "../Modal"
import Input from "../Input"
import ImageUpload from "../ImageUpload"

const EditModal = () => {
  const { data: currentUser } = useCurrentUser()
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id)
  const editModal = useEditModal()

  const [profileImage, setProfileImage] = useState('')
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [username, setUsername] = useState('')

  useEffect(() => {
    setProfileImage(currentUser?.profileImage)
    setName(currentUser?.name)
    setBio(currentUser?.bio)
    setCoverImage(currentUser?.coverImage)
    setUsername(currentUser?.username)
  }, [
    currentUser?.profileImage,
    currentUser?.name,
    currentUser?.bio,
    currentUser?.coverImage,
    currentUser?.username,
  ])

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true)
      await axios.patch(`/api/edit`, {
        profileImage,
        name,
        bio,
        coverImage,
        username,
      })
      mutateFetchedUser()
      toast.success('Successfully updated your profile.')
      editModal.onClose()
    } catch (error) {
      toast.error('Sorry for not making this perfectly. I will fix it as soon as possible. Please love me.')
    } finally {
      setIsLoading(false)
    }
  }, [bio, coverImage, editModal, mutateFetchedUser, name, profileImage, username])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUpload 
        value={profileImage}
        disabled={isLoading}
        onChange={(image) => setProfileImage(image)}
        label="Upload Profile Image"
      />
      <ImageUpload 
        value={coverImage}
        disabled={isLoading}
        onChange={(image) => setCoverImage(image)}
        label="Upload Cover Image"
      />
      <Input 
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />
      <Input 
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
      />
      <Input 
        placeholder="Bio"
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        disabled={isLoading}
      />
    </div>
  )

  return (
    <Modal 
      disabled={isLoading}
      isOpen={editModal.isOpen}
      title="Edit Profile"
      actionLabel="Save"
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  )
}

export default EditModal

23032