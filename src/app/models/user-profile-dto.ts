// Interface para o perfil do usuário no Firestore (exemplo)
export interface UserProfileDTO {
    uid: string;
    email: string;
    fullName: string;
    createdAt: Date;
  }