/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from 'react'
import {client, recommendedProfiles} from '../api'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  
  useEffect(() => {
    fetchProfiles()
  },[])

  const [profiles, setProfiles] = useState([])

  async function fetchProfiles() {
    try {
      const response = await client.query(recommendedProfiles).toPromise()
      console.log(response.data) 
      setProfiles(response.data.recommendedProfiles)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      {
        profiles.map((profile, index) => (
        <Link href={`/profile/${profile.id}`} key={index}>
        <a>
          <div>
          {
            profile.picture ? (
              <img
              src={profile.picture.original.url}
              width="60px"
              height="60px"
              />
            ) : (
              <div 
                style={{width: "60px", height: "60px", backgroundColor: "white"}}
              />
            )
          }
            <h4>{profile.handle}</h4>
            <p>{profile.bio}</p>
          </div>
        </a>
        </Link>

        ))
      }
    </div>
  )
}
