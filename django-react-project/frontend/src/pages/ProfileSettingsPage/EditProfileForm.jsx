<FormProvider {...methods}>
  <form onSubmit={handleSubmit(handleSave)}>
    <div className='mb-4'>
      <InputField label='Email' id='email' readOnly={!isEditing} />
    </div>
    <div className='mb-4'>
      <InputField label='Username' id='username' readOnly={!isEditing} />
    </div>
    {isEditing && (
      <>
        <div className='mb-4'>
          <PasswordField label='Password' id='password' />
        </div>
        <div className='mb-4'>
          <PasswordField label='Confirm Password' id='confirm_password' />
        </div>

        {/* Password feedback */}
        {isPasswordInvalid() && (
          <p className='text-red-500'>Passwords don't match!</p>
        )}
      </>
    )}
    <div className='flex space-x-4'>
      <EditButtons
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        isDisabled={isPasswordInvalid()}
      />
    </div>
  </form>
</FormProvider>;
