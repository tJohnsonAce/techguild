import useUser from '@/hooks/useUser';
import { Router } from 'next/router';
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({
  userId,
  isLarge,
  hasBorder,
}) => {
  const { data: fetchedUser } = useUser(userId);
  const router = useRouter();

  const onClick = useCallback((event: any) => {
    event.stopPropagation();

    const url = `/users/${userId}`;

    router.push(url);
  }, [router, userId]);

  return (
    <div className={`
      ${hasBorder ? 'border-2 border-cyan-950' : ''}
      ${isLarge ? 'w-32 h-32' : 'w-12 h-12'}
      rounded-full cursor-pointer hover:opacity-80 transition relative
    `}>
      <Image 
        fill
        style={{
          objectFit: 'cover',
          borderRadius: '100%'
        }}
        alt='Avatar'
        src={fetchedUser?.profileImage || '/images/anonimage.png'}
        onClick={onClick}
        />
    </div>
  );
}

export default Avatar;

//20606