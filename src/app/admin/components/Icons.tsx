import Image from 'next/image'

export const EditIcon = () => (
  <div className="icon-placeholder"> <Image src="/icons/edit_desafio.svg" alt="Edit" width={16} height={16} /></div> // Será substituído pelo ícone real
)

export const DeleteIcon = () => (
  <div className="icon-placeholder"><Image src="/icons/delete_desafio.svg" alt="Delete" width={16} height={16} /></div> // Será substituído pelo ícone real
)

export const AttributeIcon = () => (
  <div className="icon-placeholder">
    <Image src="/icons/attribute_desafio.svg" alt="Atribuir" width={16} height={16} />
  </div>
) 