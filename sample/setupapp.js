/* setupapp.js
 * electron-firebase
 * This is a quickstart template for building Firebase authentication workflow into an electron app
 * Copyright (c) 2019 by David Asher, https://github.com/david-asher
 * 

'use strict';

/*
 * This module contains functions that help to initialize or update the application
 * @module setupapp
 */

 
function _makeBaseDocuments( user )
{
    if ( !user || !user.uid || !user.displayName ) {
        return null
    }

    const isNow = ( new Date() ).toISOString()

    // there should be a root document which could contain arrays or subcontainers
    // in the root document, put fields that you want to index for searching across all users
    const root = {
        uid: user.uid,
        name: user.displayName,
        created: user.creationTime || isNow,
        collections: []
    }

    // fixups
    const profile = { ... user.profile }
    if ( !profile.email )        profile.email = user.email || null
    if ( !profile.picture )      profile.picture = user.photoURL || null

    const provider = { ... user.providerData[0] }
    if ( !provider.displayName ) provider.displayName = user.displayName || null
    if ( !provider.email )       provider.displayName = user.email || null
    if ( !provider.phoneNumber ) provider.phoneNumber = user.phoneNumber || null
    if ( !provider.photoURL )    provider.photoURL = user.photoURL || null

    const application = {
        name: global.appContext.name,
        version: global.appContext.appVersion,
        node: global.appContext.nodeVersion,
        chrome: global.appContext.chromeVersion,
        electron: global.appContext.electronVersion
    }

    const account = {
        uid: user.uid,
        name: user.displayName,
        photo: user.photoURL || null,
        email: user.email || null,
        created: user.creationTime || isNow
    }

    const session = {
        apiKey: global.fbConfig.apiKey || null,
        appName: user.appName || null,
        domain: user.authDomain || null,
        last: user.lastSignInTime || isNow
    }

    return {
        root: root,
        application: application,
        profile: profile,
        provider: provider,
        account: account,
        session: session,
    }
}


async function _buildUserDocSet( user )
{
    /************************************************************************************

    const baseDocs = _makeBaseDocuments( user )
    if ( !baseDocs ) {
        throw( "invalid user object at buildUserRoot" )
    }

    // create the root document
    await docRoot.set( baseDocs.root, setMergeFields )

    for ( var index in collectionSet ) {
        await addToRootCollections( collectionSet[ index ] )
    }

//    await collectionSet.forEach( async (value, index, array) => {
//        await addToRootCollections( value )
//    })

    // put this application in the apps collection
    await docCreate( collectionSet.apps, baseDocs.application.name, baseDocs.application )

    // create new objects in the documents collection
    await docCreate( collectionSet.docs, "profile",  baseDocs.profile ) 
    await docCreate( collectionSet.docs, "provider", baseDocs.provider ) 
    await docCreate( collectionSet.docs, "account",  baseDocs.account ) 
    await docCreate( collectionSet.docs, "session",  baseDocs.session ) 

    // create the files collection with a first file
    await docCreate( collectionSet.files, "profile", baseDocs.profile )

************************************************************************************/
    return baseDocs.root
}
